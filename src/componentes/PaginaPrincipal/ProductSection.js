import React from 'react';

const ProductSection = ({ classid, id, title, description, imageName }) => {

const imagePath = require(`../../assets/images/${imageName}`);
if (classid === "pagricolas" || classid === "tours"){
return(
    <div class={classid} id = {id}>
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
        <img src={imagePath} alt={title} />
    </div>
    );
  }
else if (classid === "artesanias" || classid === "hospedajes"){
    return(
        <div class={classid} id = {id}>
            <img src={imagePath} alt={title} />
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
        );
}
};


export default ProductSection;
