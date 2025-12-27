import type React from "react";

const HomePage = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('search job')
    }
  return (
    <>
      <h2>Welcome Jobs site</h2>
      <p>You can find your dream job</p>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" required />
        <input name="company" placeholder="Company Name" required />
        <button type="submit">Search job</button>
      </form>
    </>
  );
};

export default HomePage;
