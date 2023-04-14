import React from 'react';
import { toast } from 'react-hot-toast';

const EditModal = ({ singleEmployee, setsingleEmployee }) => {


    const updateEmployee = (e) => {
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
        fetch(`https://employees-history.vercel.app/employee/${singleEmployee?._id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(employee),
        }).then(res => res.json()).then(result => {
            if (result?.acknowledged) {
                toast.success('Update Employee Succesfully!')
                form.reset()

            } else { }
        })



    }

    return (

        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="Edit-Modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">

                    <div className='flex justify-between items-center pb-5'>
                        <h3 className="font-bold text-lg ">Edit Employee</h3>
                        <div className="modal-action">
                            <label onClick={() => setsingleEmployee(null)} htmlFor="Edit-Modal" className="bg-red-700 w-[32px] h-[32px] text-lg rounded-full text-center text-white cursor-pointer">X</label>

                        </div>
                    </div>

                    <form onSubmit={updateEmployee} action="">

                        <div className='space-y-4 pb-5 '>
                            <input defaultValue={singleEmployee?.firstName} required name='firstName' type="text" placeholder="First Name" className="input input-bordered input-primary w-full " />
                            <input defaultValue={singleEmployee?.lastName} required name='lastName' type="text" placeholder="Last Name" className="input input-bordered input-primary w-full " />
                            <input defaultValue={singleEmployee?.email} required name='email' type="email" placeholder="Email" className="input input-bordered input-primary w-full " />
                            <input defaultValue={singleEmployee?.salary} required name='salary' type="number" placeholder="Salary" className="input input-bordered input-primary w-full " />
                            <input defaultValue={singleEmployee?.date} required name='date' type="date" placeholder="Date" className="input input-bordered input-primary w-full " />
                        </div>
                        <div className='flex justify-end'>
                            <button className="btn ">Update</button>
                        </div>

                    </form>




                </div>
            </div>
        </div>

    );
};

export default EditModal;