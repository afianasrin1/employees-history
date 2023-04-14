import React from 'react';
import { toast } from 'react-hot-toast';

const AddEmployee = () => {


    const addEmployee = (e) => {
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value
        const lastName = form.lastName.value
        const email = form.email.value
        const salary = form.salary.value
        const date = form.date.value

        const employee = {
            firstName, lastName, email, salary, date
        }
        fetch(`https://employees-history.vercel.app/employee?email=${email}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(employee),
        }).then(res => res.json()).then(result => {
            if (result?.acknowledged) {
                toast.success('Employee Added Succesfully!', { duration: 1500 })
                form.reset()

            } else { }
        })



    }
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="Add-Employee" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">

                    <div className='flex justify-between items-center pb-5'>
                        <h3 className="font-bold text-lg ">Add New Employee</h3>
                        <div className="modal-action">
                            <label htmlFor="Add-Employee" className="bg-red-700 w-[32px] h-[32px] text-lg rounded-full text-center text-white cursor-pointer">X</label>

                        </div>
                    </div>

                    <form onSubmit={addEmployee}>

                        <div className='space-y-4 pb-5 '>
                            <input required name='firstName' type="text" placeholder="First Name" className="input input-bordered input-primary w-full " />
                            <input required name='lastName' type="text" placeholder="Last Name" className="input input-bordered input-primary w-full " />
                            <input required name='email' type="email" placeholder="Email" className="input input-bordered input-primary w-full " />
                            <input required name='salary' type="number" placeholder="Salary" className="input input-bordered input-primary w-full " />
                            <input required name='date' type="date" placeholder="Date" className="input input-bordered input-primary w-full " />
                        </div>
                        <div className='flex justify-end'>
                            <button className="btn ">Submit</button>
                        </div>

                    </form>




                </div>
            </div>
        </div>
    );
};

export default AddEmployee;