import React, { useEffect, useState } from "react";
import "./input.css";
import "./output.css";
import "./index.css";
import HamburgerIcon from "../src/assets/images/icon-menu.svg";
import CloseIcon from "../src/assets/images/icon-close.svg";
import Logo from "../src/assets/images/logo.svg";
import Cart from "../src/assets/images/icon-cart.svg";
import Avatar from "../src/assets/images/image-avatar.png";
import ImgOneThumb from "../src/assets/images/image-product-1-thumbnail.jpg";
import ImgOne from "../src/assets/images/image-product-1.jpg";
import ImgTwoThumb from "../src/assets/images/image-product-2-thumbnail.jpg";
import ImgTwo from "../src/assets/images/image-product-2.jpg";
import ImgThreeThumb from "../src/assets/images/image-product-3-thumbnail.jpg";
import ImgThree from "../src/assets/images/image-product-3.jpg";
import ImgFourThumb from "../src/assets/images/image-product-4-thumbnail.jpg";
import ImgFour from "../src/assets/images/image-product-4.jpg";
import IconPrev from "../src/assets/images/icon-previous.svg";
import IconNext from "../src/assets/images/icon-next.svg";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import Decrease from "../src/assets/images/icon-minus.svg";
import Increase from "../src/assets/images/icon-plus.svg";
import DeleteIcon from "../src/assets/images/icon-delete.svg";

function App() {
  const Images = [ImgOne, ImgTwo, ImgThree, ImgFour];
  const Thumbnails = [ImgOneThumb, ImgTwoThumb, ImgThreeThumb, ImgFourThumb];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [currentQty, setCurrentQty] = useState(() => {
  const cartInfo = JSON.parse(localStorage.getItem('cart'));
  return cartInfo ? Number(cartInfo.currentQty) : 1;
});


  const [cartOpen, setCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [avatarActive, setAvatarActive] = useState(false);
  const [showBadge, setShowBadge] = useState(() => {
  const cartInfo = JSON.parse(localStorage.getItem('cart'));
  return cartInfo ? cartInfo.isCarted : false;
});

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? Images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === Images.length - 1 ? 0 : prev + 1));
  };

   const currentPrice = 125
  const openLightbox = (img) => {
    basicLightbox
      .create(
        `<div style="display:flex;flex-direction:columg;align-items:center;gap:1rem">
      <img src=${img} style="max-width:350px;border-radius:10px" />
        
      </div>
    `
      )
      .show();
  };

  const handleDecrement = () => {
    setCurrentQty((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setCurrentQty((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    setShowBadge(true);
    
  };

  useEffect(() => {
    if(currentQty > 0 && showBadge){
      localStorage.setItem('cart', JSON.stringify({
        currentQty, isCarted: showBadge
      }))
    }
    else{
      localStorage.removeItem('cart')
    }
  }, [currentQty, showBadge])

  return (
    <section className="main-container">
      <div className="flex justify-between items-center px-5 py-3">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
        
          <button onClick={() => setIsOpen(true)}>
            <img
              src={HamburgerIcon}
              alt="Menu"
              className="lg:hidden w-fit h-fit"
            />
          </button>

          {/* Sliding Menu */}
          <nav
            className={`absolute top-0 left-0 z-[999] w-64 h-full bg-white shadow-lg p-6 transform transition-transform duration-400 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Close Button */}
            <button onClick={() => setIsOpen(false)}>
              <img
                src={CloseIcon}
                alt="Close"
                className="lg:hidden w-fit h-fit"
              />
            </button>

            {/* Menu Items */}
            <ul className="space-y-4 mt-4">
              <li>Collections</li>
              <li>Men</li>
              <li>Women</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </nav>

          {/* Logo */}
          <img src={Logo} alt="Logo" className="mt-[-5px] w-fit h-fit" />
        </div>

        {/* Center: Navigation */}
        <nav>
          <ul className="hidden lg:flex justify-center items-center gap-x-8 cursor-pointer">
            <li className="hover:text-orange-600">Collections</li>
            <li className="hover:text-orange-600">Men</li>
            <li className="hover:text-orange-600">Men</li>
            <li className="hover:text-orange-600">Women</li>
            <li className="hover:text-orange-600">About</li>
            <li className="hover:text-orange-600">Contact</li>
          </ul>
        </nav>

        {/* Right: Cart + Avatar */}
        <div className="flex gap-3 items-center">
          <div
            className="relative cursor-pointer"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <img src={Cart} alt="Cart" className="w-8 h-8" />
            {showBadge && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {currentQty}
              </span>
            )}
          </div>

          {/* cart dropdown */}
          {cartOpen && (
            <div className="absolute top-12 right-0 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg border-b-2  pb-2">Cart</h3>
                
                <img
                  src={CloseIcon}
                  alt="Close"
                  className="cursor-pointer w-fit h-fit"
                  onClick={() => {
                    setCartOpen(false);
                  }}
                />
              </div>

              <div className="py-4">
                {showBadge ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={ImgOneThumb}
                        alt="Product"
                        className="w-12 h-12 rounded"
                      />
                      <div>
                        <p className="text-gray-600">
                          Fall Limited Edition Sneakers
                        </p>
                        <p className="text-gray-500">
                          ${currentPrice} x {currentQty}{" "} <br />
                          <span className="font-bold text-black">
                            TOTAL: ${currentPrice * currentQty}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowBadge(false);
                        setCurrentQty(1);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <img src={DeleteIcon} alt="" className="cursor-pointer" />
                    </button>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    Your cart is empty.
                  </p>
                )}
              </div>
              {showBadge && (
                <button className="bg-orange-500 text-white font-bold w-full py-3 rounded-lg cursor-pointer hover:opacity-80">
                  Checkout
                </button>
              )}
            </div>
          )}

          <img
            src={Avatar}
            alt="User"
            onClick={() => setAvatarActive(!avatarActive)}
            className={`w-10 h-10 cursor-pointer rounded-full border-2 transition-colors duration-200 ${
              avatarActive ? "border-orange-500" : "border-transparent"
            }`}
          />
        </div>
      </div>

      <hr className="header-line bg-gray-700 hidden md:block mb-10 " />

      <div className="flex flex-col md:flex-row md:items-start md:justify-center md:gap-25 md:p-5">
        <div className="photo-div flex flex-col md:flex-row justify-center items-center">
          <div className="relative md:flex flex-col justify-center items-center">
            <div>
              <img
                src={Images[currentIndex]}
                alt="Sneakers"
                className="w-full relative md:w-[23rem] md:rounded-xl mx-auto"
                onClick={() => {
                  if (window.innerWidth >= 768)
                    openLightbox(Images[currentIndex]);
                }}
              />
            </div>

            <div className=" absolute inset-0 flex justify-between items-center px-4 md:hidden">
              <img
                src={IconPrev}
                alt="Previous"
                className="bg-white p-3 rounded-full cursor-pointer shadow-md"
                onClick={prevImage}
              />
              <img
                src={IconNext}
                alt="Previous"
                className=" bg-white p-3 rounded-full cursor-pointer shadow-md"
                onClick={nextImage}
              />
            </div>

            <div className="hidden md:flex md:flex-wrap max-w-[23rem] gap-2 mt-4">
              {Thumbnails.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 rounded-lg cursor-pointer hover:opacity-75 ${
                    currentIndex === index ? "border-2 border-orange-500" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <section className="info p-5 md:max-w-1/2">
          <p className="uppercase text-gray-600 tracking-wider font-semibold">
            Sneaker company
          </p>

          <h3 className="font-bold text-3xl py-3 md:text-5xl">
            Fall Limited Edition Sneakers
          </h3>

          <p className="text-gray-500 md:max-w-3/4 md:text-lg">
            These low profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole , they'll withstand everything
            the weather can offer.
          </p>

          <div className="flex mt-2">
            <p className="py-2 text-3xl font-bold">${currentPrice}</p>
            <p className="rounded-xl bg-black text-white flex font-bold items-center ml-5 mt-2 py-2 px-3 w-15 h-10">
              50%
            </p>

            <p className="line-through font-bold text-lg text-gray-600 ml-25 mt-3 md:hidden">
              $250.00
            </p>
          </div>
          <div className="hidden md:block line-through font-bold text-lg text-gray-600  mt-3">
            $250.00
          </div>

          <div className="md:flex gap-4">
            <div className="bg-gray-100 flex items-center justify-between w-full mt-5 rounded-lg px-3 h-10 md:w-1/2">
              {/* Decrease button */}
              <img
                src={Decrease}
                alt="Decrease quantity"
                className="cursor-pointer"
                onClick={handleDecrement}
              />

              {/* Quantity display */}
              <span className="font-bold text-lg">{currentQty}</span>

              {/* Increase button */}
              <img
                src={Increase}
                alt="Increase quantity"
                className="cursor-pointer"
                onClick={handleIncrement}
              />
            </div>

            <button
              className="bg-orange-500 flex text-lg tracking-wider font-semibold mt-5 w-full justify-center p-4 rounded-xl shadow-xl gap-4 cursor-pointer"
              onClick={handleAddToCart}
            >
              <img src={Cart} alt="Cart" />
              Add to cart
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default App;
