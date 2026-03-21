
import Swal from 'sweetalert2'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Url } from '../../../url/url';
// import { productdata } from '../../../redux/slice/product'


export default function ProductDataList(props) {
   
    const data = props.data 
    const productDrop = async(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) { 
                await axios.delete(`${Url}/product/delete/${id}` ).then(()=>{ 
                        Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Item Delete Successfully',
                        showConfirmButton: false,
                        timer: 1000
                        }) 
                 }).catch((error)=>{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'something went wrong',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                 
            }
        }) 
    } 
  return (
    <>
    <section className='table-responsive'>
        <table className='table table-striped table-bordered text-center table-hover align-top'>
            <thead className='table-primary'>
                <tr className='align-top'>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>SubCategory</th>
                    <th>Remaining Product</th>
                    <th>Rating</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>  
                {data.map((cv, i)=>{
                    return(
                        <tr className='text-center' key={i}>
                            <td  className=''>
                                <img src={`${Url}/${cv.thumbnailImage}`} alt="" className='img-fluid mx-auto' style={{width : "70px"}}/>
                            </td>
                            <td className=''>{cv.productName}</td>
                            <td  className=''>{cv.category}</td>
                            <td  className=''>{cv.subCategory}</td>
                            <td  className=''>{cv.totalProduct}</td>
                            <td  className=''>4.5 </td>
                            <td  >
                                <div className='d-flex align-items-center'>
                                <Link to={`/dashboard/edit-product/${cv._id}`} className='btn border-0'>
                                    <i className="fa-solid fa-pen-to-square text-warning fa-lg " /> <br />
                                </Link>
                                <button className='btn border-0' onClick={e=>productDrop(cv._id)}>
                                    <i className="fa-solid fa-trash text-danger fa-lg"  />
                                </button>
                                <Link className='btn border-0' to={`/dashboard/product/${cv._id}`}> 
                                    <i className="fa-solid fa-eye text-primary fa-lg" />  
                                </Link>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </section>
    </>
  );
}