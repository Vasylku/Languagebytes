import React from "react";
import './resource-card.css';
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

export const Card = (props: { src: string | undefined; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; path: string | undefined; }) => {

    return (
        <>
            <div className='card-res'>
                <img className='card-img'
                    alt=''
                    src={props.src} />
                <div className="card-content">
                    <div className="card-title">
                        {props.title}
                    </div>
                    <div className='card-info'>
                        {props.text}
                    </div>

                    <Button className="avatar-button">
                        <a href={props.path}>
                         View more
                        </a>
                    </Button>

                </div>
            </div>
        </>
    );
};