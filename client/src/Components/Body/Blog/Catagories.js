import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import lifestyle from "../../../assets/images/lifestyle.jpg";
import wild from "../../../assets/images/wild.jpg";
import film from "../../../assets/images/film.jpg";
import sports from "../../../assets/images/sports.jpg";
import space from "../../../assets/images/space.jpg";
import food from "../../../assets/images/food.jpg";
import beach from "../../../assets/images/beach.jpg";
import gym from "../../../assets/images/gym.jpg";
import music from "../../../assets/images/music.jpg";
import car from "../../../assets/images/car.jpg";
import bike from "../../../assets/images/bike.jpg";
import mountain from "../../../assets/images/mountain.jpg";

function Catagories() {
  return (
    <div className="catagories">
      <h6 className="mb-3 text-center">Catagories</h6>
      <div className="card catagoryCard">
        <Link to="/catagory/Lifestyle">
          <Button variant="warning" className="cat-btn primary-btn ">
            Lifestyle
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={lifestyle} alt="catagory-pic" />
      </div>
      <div className="card catagoryCard">
        <Link to="/catagory/Wild">
          <Button variant="warning" className="cat-btn primary-btn ">
            Wild
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={wild} alt="catagory-pic" />
      </div>{" "}
      <div className="card catagoryCard">
        <Link to="/catagory/Film">
          <Button variant="warning" className="cat-btn primary-btn ">
            Film
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={film} alt="catagory-pic" />
      </div>{" "}
      <div className="card catagoryCard">
        <Link to="/catagory/Sports">
          <Button variant="warning" className="cat-btn primary-btn ">
            Sports
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={sports} alt="catagory-pic" />
      </div>{" "}
      <div className="card catagoryCard">
        <Link to="/catagory/Space">
          <Button variant="warning" className="cat-btn primary-btn ">
            Space
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={space} alt="catagory-pic" />
      </div>{" "}
      <div className="card catagoryCard">
        <Link to="/catagory/Food">
          <Button variant="warning" className="cat-btn primary-btn ">
            Food
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={food} alt="catagory-pic" />
      </div>{" "}
      <div className="card catagoryCard">
        <Link to="/catagory/Beach">
          <Button variant="warning" className="cat-btn primary-btn ">
            Beach
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={beach} alt="catagory-pic" />
      </div>{" "}
      <div className="card catagoryCard">
        <Link to="/catagory/Gym">
          <Button variant="warning" className="cat-btn primary-btn ">
            Gym
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={gym} alt="catagory-pic" />
      </div>{" "}
      <div className="card catagoryCard">
        <Link to="/catagory/Music">
          <Button variant="warning" className="cat-btn primary-btn ">
            Music
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={music} alt="catagory-pic" />
      </div>{" "}
      <div className="card catagoryCard">
        <Link to="/catagory/Mountain">
          <Button variant="warning" className="cat-btn primary-btn ">
            Mountain
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={mountain} alt="catagory-pic" />
      </div>{" "}
      <div className="card catagoryCard">
        <Link to="/catagory/Car">
          <Button variant="warning" className="cat-btn primary-btn ">
            Car
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={car} alt="catagory-pic" />
      </div>{" "}
      <div className="card catagoryCard">
        <Link to="/catagory/Bike">
          <Button variant="warning" className="cat-btn primary-btn ">
            Bike
          </Button>
        </Link>
        <img class="rounded-3 catImg" src={bike} alt="catagory-pic" />
      </div>{" "}
    </div>
  );
}

export default Catagories;
