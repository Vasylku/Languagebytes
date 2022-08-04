import React from "react";
import { Card } from "../../components/card/resource-card";
import './resource.css';
import '../../components/card/resource-card.css';

export const Resource = () => {

    return (
        <>
            <div className="res">
                <Card
                    src='https://yt3.ggpht.com/a/AGF-l7_wJZ-lPCV6Ge14qUjH60iyZljLbsHq3mpsZQ=s900-c-k-c0xffffffff-no-rj-mo'
                    title='Mango'
                    text="Language-learning methodology that's proven effective"
                    path="https://mangolanguages.com/"

                />

                <Card
                    src='https://cdn.freebiesupply.com/images/thumbs/2x/duolingo-logo.png'
                    title='Duolingo'
                    text='The free, fun, and effective way to learn a language!'
                    path="https://www.duolingo.com/"

                />
                <Card
                    src='https://playinfluent.com/wp-content/uploads/slide-levelup1.jpg'
                    title='Influent'
                    text='Level up your language skills'
                    path="https://playinfluent.com/"
                />
            </div>
        </>
    );
};
