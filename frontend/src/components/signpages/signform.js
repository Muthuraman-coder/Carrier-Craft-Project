import axios from "axios";
import React, { useState } from "react";

const Form = () => {
  const [form , setform ] = useState({name:'' , email:'' , number:'', course:''})

  const handlechange = (e) =>{
    setform({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    try{
      const res = axios.post('http://localhost:3001/api/enquires' , form )
      console.log('enquires response' , res.data)
      setform({name:'' , email:'' , number:'', course:''})
      alert('Enquire summited successfully we will call you later!')
    }catch(error){
      console.error('enquire error' , error)
    }
  }

  return (
      <section className="hero-section">
        <div className="content">
          <h1>
            Online Learning Programmes from South India’s Leading Coaching
            Academy
          </h1>
          <ul>
            <li>
              12+ years of sterling legacy with experienced faculty & mentors
            </li>
            <li>Regular mentor support with daily topic-wise</li>
            <li>
              Best-in-class mock tests, study materials, books & classes
            </li>
          </ul>
        </div>

        <div className="form-container">
          <h2>Enquire for Joining in CCA</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your full name" name="name" value={form.name} onChange={handlechange} required />
            <input type="email" placeholder="Enter your email ID" name="email" value={form.email} onChange={handlechange} required />
            <input type="tel" placeholder="Enter your mobile number" name="number" value={form.number} onChange={handlechange} required />
            <input type="text" placeholder="What course your intrested ?" name="course" value={form.course} onChange={handlechange} required />
            <button type="submit">Get a Call Back</button>
            <p className="terms">
              By continuing & signing in, you agree to CCA's{" "}
              <a href="/terms">Terms & Conditions</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </section>
  );
};

export default Form;
