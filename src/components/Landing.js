import React from 'react';

const Landing = () => (
 <section className="landing">
   <h1 className="hero-title">Turn the music up!</h1>
   <section className="selling-points">
    <div className="point">
        <h2 className="point-title">Choose your music</h2>
        <p className="point-description">The world is full of music; why should you have to listen to the music someone else choses?</p>
   </div>
   <div className="point">
        <h2 className="point-title">Unlimited, streaming, ad-free</h2>
        <p className="point-description">No arbitrary limits. No distractions.</p>
   </div>
    <div className="point">
        <h2 className="point-title">Mobile Enabled</h2>
        <p className="point-description">Listen to your music on the go. This streaming service is avilable on all mobile platforms.</p>
    </div>
   </section>
 </section>
);

export default Landing;
