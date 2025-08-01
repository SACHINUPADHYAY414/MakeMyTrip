import React from 'react';

const Loader = () => {
  return (
    <div class="loader-overlay">
      <div class="container_loader2">
        <div class="loaderpp">
          {[...Array(20)].map((_, i) => (
            <span key={i} style={{ "--i": i + 1 }}></span>
          ))}
        </div>
        <div className="loadtxtfl">
          Just a moment — we’re getting everything ready for you.
        </div>

      </div>
    </div>
  );
};

export default Loader;
