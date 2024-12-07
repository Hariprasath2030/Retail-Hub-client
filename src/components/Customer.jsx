import { useState } from 'react';
import { Button } from 'antd';
import Cus_Card from "./Cus_Card";
import { useAuth } from '..//contexts/AuthContext';
import logo from '/src/assets/retail.png';
import "../assets/css/NavigationBar.css";

const Customer = () => {  
  const { logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
    return (
    <>
 {/* Navbar */}
 <nav className="navbar">
    <nav className="side_navbar">
      <div className="logo" onClick={toggleMenu}>
        <img src="your-logo.png" alt="Logo" />
      </div>
      {showMenu && (
        /* From Uiverse.io by sahilxkhadka */ 
<div class="menu card w-72 bg-white p-5 shadow-md shadow-black-200/50 rounded-md">
  <ul class="w-full flex flex-col gap-2">
    <li
      class="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
    >
      <button
        class="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-slate-400 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
      >
        <svg
          stroke="#000000"
          class="icon glyph size-6 group-focus:fill-white group-focus:stroke-white"
          id="dashboard-alt"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#000000"
        >
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            id="SVGRepo_tracerCarrier"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z"></path>
            <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z"></path>
            <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z"></path>
          </g>
        </svg>
        Dashboard
      </button>
    </li>
    <li
      class="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
    >
      <button
        class="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-slate-400 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="size-6"
        >
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            id="SVGRepo_tracerCarrier"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              class="group-focus:fill-white"
              fill="#000"
              d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224ZM12.5 15C14.1695 15 15.5228 13.6569 15.5228 12C15.5228 10.3431 14.1695 9 12.5 9C10.8305 9 9.47716 10.3431 9.47716 12C9.47716 13.6569 10.8305 15 12.5 15Z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </g>
        </svg>
        Settings
      </button>
    </li>
    <li
      class="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
    >
      <button
        class="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-slate-400 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="size-6"
        >
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            id="SVGRepo_tracerCarrier"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              class="group-focus:fill-white"
              fill="#000000"
              d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z"
            ></path>
            <path
              class="group-focus:fill-white"
              fill="#000"
              d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z"
            ></path>
          </g>
        </svg>
        Logout
      </button>
    </li>
  </ul>
</div>

      )}
    </nav>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '50px'}} />
          <h2>SMART RETAIL HUB</h2>
          </div>
  <Button
    onClick={logout}
    style={{
        padding: '8px 15px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontSize: '16px',
        textAlign: 'center',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#444')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#333')}
>
    Logout
</Button>

</nav>
      {/* Main Content */}
    <div className={`content`}>
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
      </div>
    </>
  );
};

export default Customer;