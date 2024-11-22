import React from "react";
import PageTabs from "./../components/base/PageTabs/PageTabs";
import ActiveListingCard from "../components/base/ActiveListingCard/ActiveListingCard";
import TransactionCard from "../components/base/TransactionCard/TransactionCard";
import TransactionList from "../pages/Transactions/TransactionList/TransactionList.view";

const Cylvia = (props) => {
  return (
    <div>
      <h1>Cylvia</h1>
      <TransactionList/>
      <PageTabs item1="Pending" item2="Confirmed" item3="Completed" item4="Cancelled"/>
      <ActiveListingCard itemname="banana" price="5" stock="3" days="1" distance="1.2" source="https://picsum.photos/200"/>
      <TransactionCard type="selling" itemName="banana" time="2" portions="10" sellerName="cylvito" price="5" source="https://picsum.photos/200/400"/>
    </div>
  );
};

export default Cylvia;
