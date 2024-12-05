import React from "react";
import SearchBar from "./SearchBar";
import RoutesList from "../searchRoute/RoutesList";
import { useLocation } from "react-router-dom";
import BANNER from "../../assets/images/banner_img.png";
import Filter from "./Filter";

const HomepageResults = () => {
  const location = useLocation();
  const routes = location.state?.routes;
  const isLoading = location.state?.isLoading;

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="">
      <img src={BANNER} alt="" className="pb-5" />
      <SearchBar />
      <div className="flex bg-background m-5 justify-center">
        <Filter />
        <div className="">
          <div className=" bg-white ml-5  bg-transparent   ">
            <div className="">
              <RoutesList routes={routes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageResults;
