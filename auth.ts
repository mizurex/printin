
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma/prisma";
 
export const { handlers, signIn, signOut, auth } = NextAuth({

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {

      if (account?.provider === "google") {
        try {
         
          const existingUser = await prisma.user.findUnique({
            where: { user_id: account.providerAccountId } as any
          });

          if (existingUser) {
            console.log("User exists:", existingUser);
          
            await prisma.user.update({
              where: { user_id: account.providerAccountId } as any,
              data: {
                name: user.name || existingUser.name,
                email: user.email || existingUser.email,
              }
            });
          } else {
            console.log("Creating new user...");
         
            await prisma.user.create({
              data: {
                user_id: account.providerAccountId, 
                name: user.name || "Unknown",
                email: user.email!,   
              } as any
            });
          }
          return true;
        } catch (error) {
          console.error("Database error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    
        async jwt({ token, account }) {
        // Store Google ID in JWT token
        if (account?.provider === "google") {
          token.googleId = account.providerAccountId;
        }
        return token;
      },
      
      async session({ session, token }) {
        // Put Google ID in session so you can access it
        if (token.googleId) {
          session.user.id = token.googleId as string;
        }
        return session;
      },

     
  },
})
