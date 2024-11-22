import React from "react";
import Typography from "../components/base/Typography/Typography";
import BuyerContactCard from "../components/base/BuyerContactCard/BuyerContactCard";
import MeetUpInfoCard from "../components/base/MeetUpInfoCard/MeetUpInfoCard";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SellingItemCard from "../components/base/SellingItemCard/SellingItemCard";
import DescriptionCard from "../components/base/DescriptionCard/DescriptionCard";
import SellerInfoCard from "../components/base/SellerInfoCard/SellerInfoCard";
import BackButton from "../components/base/BackButton/BackButton";

const Yuki = () => {
  return (
    <div style={{margin: "1rem", boxSizing: "border-box"}}>
      <section>
        <h1 style={{ textDecoration: "underline" }}>Yuki</h1>
        <div style={{marginBottom: "1rem"}}>
        <h3>Typography</h3>
        
        <Typography variant="h1-graphik-bold" color="blue">h1-graphik-bold</Typography>
        <Typography variant="h2-graphik-bold" color="black">h2-graphik-bold</Typography>
        <Typography variant="h3-graphik-bold" color="white" style={{"backgroundColor": "black"}}>h3-graphik-bold</Typography>
        <Typography variant="h4-graphik-bold" color="gray">h4-graphik-bold</Typography>
        <Typography variant="body-1-medium" color="light-gray">body-1-regular</Typography>
        <Typography variant="body-2-regular" color="dark-blue">body-2-regular</Typography>
        <Typography variant="body-3-regular" color="light-blue">body-3-regular</Typography>
        <Typography variant="body-4-regular" color="yellow">body-4-regular</Typography>
        <Typography variant="button-regular"> button-regular </Typography>
        </div>

        <h3>Buyer Contact Card</h3>
        <div style={{marginBottom: "1rem"}}>
          <BuyerContactCard
            source="https://picsum.photos/200"
            nameOfBuyer="aishasells"
            contactTel="(+1)000=0000"
            email="aisha@email.com"
          />
        </div>

        <h3>Description Card</h3>
        <div style={{marginBottom: "1rem"}}>
          <DescriptionCard
            onClick={() => console.log("test")}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no"
          />
        </div>

        <h3>Meet Up Info Card</h3>
        <div style={{marginBottom: "1rem"}}>
          <MeetUpInfoCard 
            date="Jun 23, 2023"
            time="14:00"
            location="100 W 49th Ave, Vancouver, BC V5Y 2Z6"
            // markerData="49.225693, -123.107326"
            latitude="49.225693"
            longitude="-123.107326"
          />
        </div>

        <h3>Selling Item Card</h3>
        <div style={{marginBottom: "1rem"}}>
        <SellingItemCard
            source="https://picsum.photos/200"
            itemName="Banana"
            dateApproved="June 15, 2023"
            price="11"
            quantity="1"
          />
        </div>


        <h3>Seller Info Card</h3>
        <div style={{marginBottom: "1rem"}}>
        <SellerInfoCard
            source="https://picsum.photos/200"
            username="aishasells"
            location="Vancouver, BC"
            items="1"
          />
        </div>

        <div>
          <h3>Back Button</h3>
          <BackButton />


        </div>

        <hr />
      </section>
    </div>
  );
};

export default Yuki;
