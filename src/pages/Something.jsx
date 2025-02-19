import React, { useState } from "react";

const Something = () => {
  const [email, setEmail] = useState("");
  console.log(email);
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default Something;
