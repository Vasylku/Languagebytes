import "./page-wrapper.css";
import React from "react";
import { User } from "../../constants/types";
import { PrimaryNavigation } from "../navigation/navigation";
import { Footer } from "../footer/footer";
import {Navbar} from "../navbar/navbar";
import { useUser } from "../../authentication/use-auth";

type PageWrapperProps = {
 user?: User;
};

//This is the wrapper that surrounds every page in the app.  Changes made here will be reflect all over.
export const PageWrapper: React.FC<PageWrapperProps> = ({ user, children }) => {

  return (
         <><Navbar />
       
   
      <div className="main-content">{children}</div>
    
     
      <Footer />
    </>
  );
};
function userUser() {
  throw new Error("Function not implemented.");
}

