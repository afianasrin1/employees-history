import React, { useEffect, useState } from 'react';
import AddEmployee from './AddEmployee';
import { toast } from 'react-hot-toast';

const Home = ({ setsingleEmployee }) => {
    const [employees, setEmployees] = useState([])

    // get all employees 
    useEffect(() => {
        fetch('https://employees-history.vercel.app/employees',).then(res => res.json()).then(data => {
            setEmployees(data)
        })
    }, [employees])

    const oneEmployee = (id) => {
        fetch(`https://employees-history.vercel.app/employee/${id}`,).then(res => res.json()).then(data => {
            setsingleEmployee(data)
        })
    }


    // delete employes 
    const deleteEmployee = (id) => {
        const con = window.confirm("Are you sure?")
        if (con) {
            fetch(`https://employees-history.vercel.app/employee/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                console.log(data);
                if (data?.acknowledged) {
                    toast.success('Employee Deleted Succesfull!')
                }
            })
        }
    }



    return (
        <div>

            <div className='space-x-4 pb-7'>
                <label htmlFor="Add-Employee" className='text-white btn btn-success capitalize'>Add Employee</label>
                <button className='text-white btn btn-outline btn-info capitalize'>Logout</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Salary</th>
                            <th>Date</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {employees?.map((employee, i) => <tr key={employee?._id}>
                            <th>{i + 1}</th>
                            <td>{employee?.firstName}</td>
                            <td>{employee?.lastName}</td>
                            <td>{employee?.email}</td>
                            <td>${employee?.salary}</td>
                            <td>{employee?.date}</td>
                            <td className=' space-x-3'>
                                <label htmlFor="Edit-Modal" onClick={() => oneEmployee(employee?._id)} className='text-white btn hover:outline-none btn-outline btn-info capitalize'>Edit</label>
                                <button onClick={() => deleteEmployee(employee?._id)} className='text-white btn btn-outline hover:outline-none btn-info capitalize'>Delete</button>
                            </td>
                        </tr>)}


                    </tbody>
                </table>
            </div>
            <AddEmployee />


        </div>
    );
};

export default Home;