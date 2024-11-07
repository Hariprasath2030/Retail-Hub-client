import React from "react";
import "react-router-dom";
import Cus_Card from "./Cus_Card";
const Customer = () => {
  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex w-[1400px] h-auto m-2 shadow-md rounded-md p-4 flex-wrap gap-5 justify-center">
          <Cus_Card
            url="https://www.jiomart.com/images/product/original/490002184/colgate-max-fresh-peppermint-ice-blue-gel-toothpaste-150-g-product-images-o490002184-p490002184-0-202306061334.jpg?im=Resize=(420,420)"
            title="Colgate"
            price="40"
            desc="Description"
          />
          <Cus_Card
            url="https://thesparkshop.in/wp-content/uploads/2022/10/2018-New-Fashion-Casual-Men-Shirt-Long-Sleeve-Europe-Style-Slim-Fit-Shirt-Men-High-Quality__90065.1537167939.jpg"
            title="Surhi"
            price="299"
            desc="Men Regular Fit Checkered Spread Collar Casual Shirt"
          />
          <Cus_Card
            url="https://rukminim2.flixcart.com/image/280/280/xif0q/toothbrush/p/u/b/-original-imagyfescnvgxdp7.jpeg?q=70"
            title="Colgate ZigZag Medium Bristle Multicolour"
            price="98"
            desc="Compact Brush Head Medium Toothbrush  (Pack of 6)"
          />
          <Cus_Card
            url="https://rukminim2.flixcart.com/image/612/612/xif0q/shampoo/5/x/w/-original-imagznxwveu6z9vc.jpeg?q=70"
            title="Dove Sampoo"
            price="551"
            desc="DOVE Intense Repair Nourishing Shampoo  (1000 ml)"
          />
          <Cus_Card
            url="https://rukminim2.flixcart.com/image/280/280/ki96c280/flour/z/s/r/1-superior-mp-atta-1-whole-wheat-flour-aashirvaad-original-imafy2vzdzhr4yeg.jpeg?q=70"
            title="AASHIRVAAD Select Atta   "
            price="322"
            desc="Made from 100% MP Sharbati Wheat for Softer Rotis (godhumai maavu)  (10% Extra in Pack)  (5 kg)"
          />
          <Cus_Card
            url="https://rukminim2.flixcart.com/image/280/280/xif0q/toothpaste/p/2/n/-original-imagyys8wmzhgxv6.jpeg?q=70"
            title="Dabur Red Toothpaste"
            price="264"
            desc="Ayurvedic Paste Toothpaste  (700 g)"
          />
          <Cus_Card
            url="https://rukminim2.flixcart.com/image/280/280/kyrlifk0/hair-oil/b/3/k/600-anmol-gold-coconut-hair-oil-600ml-dabur-original-imagaxcevmzke75w.jpeg?q=70"
            title="Dabur Anmol Gold 100% Pure Coconut Oil"
            price="94"
            desc=" Nariyal Tel | Natural | Multipurpose Hair Oil (thengai ennai)  (600 ml)"
          />
          <Cus_Card
            url="https://rukminim2.flixcart.com/image/280/280/xif0q/mosquito-vaporise-refill/q/c/b/-original-imahy8hymjqu3g3w.jpeg?q=70"
            title="Natural Liquid Mosquito"
            price="161"
            desc="Flipkart Supermart Natural Liquid Mosquito Vaporiser Refill  (4 x 45 ml)"
          />
          <Cus_Card
            url="https://www.jiomart.com/images/product/original/490002184/colgate-max-fresh-peppermint-ice-blue-gel-toothpaste-150-g-product-images-o490002184-p490002184-0-202306061334.jpg?im=Resize=(420,420)"
            title="Colgate"
            price="40"
            desc="Description"
          />
        </div>
      </div>
    </>
  );
};

export default Customer;