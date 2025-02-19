import { useState } from 'react';
import './RegisterPage.css';
import { RegisterApi } from '../services/api';
import { Storage } from '../services/storage';
import { Authentication } from '../services/auth';
import { Link, Navigate } from 'react-router-dom';


export default function RegisterPage() {
    const initialstate = {
        name: { required: false },
        email: { required: false },
        password: { required: false },
        customerror: null,
    };

    const [errors, seterrors] = useState(initialstate);
    const [Loading, setloading] = useState(false);
    const [inputs, setinputs] = useState({
        email: '',
        password: '',
        name: '',
    });

    const handlesubmit = (event) => {
        event.preventDefault();

        let error = initialstate;
        let haserror = false;

        if (inputs.email === '') {
            error.email.required = true;
            haserror = true;
        }
        if (inputs.name === '') {
            error.name.required = true;
            haserror = true;
        }
        if (inputs.password === '') {
            error.password.required = true;
            haserror = true;
        }

        if (!haserror) {
            setloading(true);
            //console.log(RegisterApi);
            

            RegisterApi(inputs)
                .then((response) => {
                    //console.log(response);
                    
                 //console.log(response.data.idToken);
                 //localStorage.setItem('idtoken',response.data.idToken);
                 
                    Storage(response.data.idToken);
                   //console.log(localStorage.getItem('idtoken'));
                    
                })
                .catch((err) => {
                    console.log(err);
                    if(err.response.data.error.message==="EMAIL_EXISTS"){
                        seterrors({...error,customerror:"Already this has been email registered"});
                    }
                    else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
                        seterrors({...error,customerror:"Password should be at least 6 character"});

                    }
                })
                .finally(() => setloading(false));
        }
        seterrors({...error});
    };

    const handleinput = (event) => {
        setinputs({ ...inputs, [event.target.name]: event.target.value });
    };

    if(Authentication()){
       return <Navigate to='/login'/>

    }

    return (
        <section className="register-block">
            <div className="container">
                <div className="row">
                    <div className="col register-sec">
                        <h2 className="text-center">Register Now</h2>
                        <form className="register-form" onSubmit={handlesubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="text-uppercase">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    onChange={handleinput}
                                    id="name"
                                />
                                {errors.name.required ? (
                                    <span className="text-danger">Name is required.</span>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="mail" className="text-uppercase">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    onChange={handleinput}
                                    id="mail"
                                />
                                {errors.email.required ? (
                                    <span className="text-danger">Email is required.</span>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass" className="text-uppercase">
                                    Password
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    onChange={handleinput}
                                    id="pass"
                                />
                                {errors.password.required ? (
                                    <span className="text-danger">Password is required.</span>
                                ) : null}
                            </div>
                            <div className="form-group">
                                {errors.customerror ? (
                                    <span className="text-danger">
                                        <p>{errors.customerror}</p>
                                    </span>
                                ) : null}

                                {Loading ? (
                                    <div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                ) : null}

                                <input
                                    type="submit"
                                    className="btn btn-login float-right"
                                    disabled={Loading}
                                    value="Register"
                                />
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-group">
                                Already have account? Please <Link to="/login">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
