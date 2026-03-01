import React from "react";
import Navbar from "../components/Navbar.jsx";
import Ai from "../assets/ai-generated.jpg";

const Home = () => {
  return (
    <div
      className="bg-cover h-screen"
      style={{ backgroundImage: `url(${Ai})` }}
    >
      <Navbar />

      <div
        className="shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] rounded-2xl background: rgba(255, 255, 255, 0.08);
  -webkit-backdrop-filter: blur(5px); w-[50rem] mt-8 ml-4*"
      >
        <p className="text-white text-lg pt-8 px-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet
          eget sit amet tellus cras adipiscing enim. Eu augue ut lectus arcu
          bibendum at varius vel pharetra. Tristique sollicitudin nibh sit amet.
          Malesuada bibendum arcu vitae elementum. Cursus metus aliquam eleifend
          mi in nulla. Gravida cum sociis natoque penatibus et. Sit amet massa
          vitae tortor condimentum. Mauris a diam maecenas sed enim. Nam at
          lectus urna duis.
        </p>
        <p className="text-white text-lg py-8 px-12">
          Morbi tincidunt ornare massa eget egestas purus viverra. Varius quam
          quisque id diam vel quam elementum pulvinar. Eget sit amet tellus cras
          adipiscing. Morbi quis commodo odio aenean sed adipiscing diam donec.
          Ut faucibus pulvinar elementum integer enim. Suscipit tellus mauris a
          diam. Sed augue lacus viverra vitae congue eu consequat. Risus nec
          feugiat in fermentum posuere urna. Eget duis at tellus at. At varius
          vel pharetra vel turpis nunc. Tristique risus nec feugiat in fermentum
          posuere urna. Nisi porta lorem mollis aliquam ut porttitor leo a diam.
          Et ligula ullamcorper malesuada proin. Penatibus et magnis dis
          parturient montes nascetur ridiculus mus mauris. Volutpat consequat
          mauris nunc congue nisi vitae suscipit tellus mauris. Aliquet eget sit
          amet tellus cras adipiscing enim eu. Habitant morbi tristique senectus
          et netus.
        </p>
      </div>
    </div>
  );
};

export default Home;
