import React from "react";
import { Link } from "react-router-dom";
import './not-found.css';
import { Button } from "semantic-ui-react";
import Particles, { ISourceOptions } from "react-tsparticles";
import configParticles from "../../components/particles/configParticles";



export const NotFoundPage = () => {

    return (
        <div className="page">
            <Particles options={configParticles as unknown as ISourceOptions} />
            <div className="page-text-title"  >
                <h1 >
                    Not Found
                </h1>
                <h2 >
                    The page you're looking for does not exist
                </h2>
                <Link to="/home"><Button className="p-button">Go to HOME</Button></Link>
            </div>
        </div>
    );
}
