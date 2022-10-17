import { useForm } from "react-hook-form";
import "./createBook.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addBook, editBook } from '../../features/books/booksSlice'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useEffect, useState } from 'react';

const MySwal = withReactContent(Swal)


const CreateBook = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { index } = useParams()

  const [book, setBook] = useState({
    title:"",
    image:"",
    country:"",
    year:"",
    author:"",
    synopsis:""
  })
  const books = useSelector((state)=> state.books)

  useEffect(()=>{
    if(index){
      setBook(books[index])
    }
  },[])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {

    if(index){
      try {
        dispatch(editBook({
          index,
          title: data.title.trim(),
          imageLink: data.image,
          country: data.country.trim(),
          year: data.year,
          author: data.author.trim(),
          synopsis: data.synopsis.trim(),
          id: uuidv4(),}))
        navigate(`/details/${index}`)
        MySwal.fire({
          title: 'Updated!',
          text: 'Your book was successfully updated',
          icon: 'success',
          confirmButtonText: 'Ok',
        }) 
    
        // limpiar campos
        e.target.reset();
  
      } catch (error) {
  
        console.log(error)
        MySwal.fire({
          title: 'Error!',
          text: 'Sorry... your book was not successfully updated',
          icon: 'error',
          confirmButtonText: 'Ok',
        }) 
  
      }
    }else{
      try {

        dispatch(addBook({
          title: data.title.trim(),
          imageLink: data.image,
          country: data.country.trim(),
          year: data.year,
          author: data.author.trim(),
          synopsis: data.synopsis.trim(),
          id: uuidv4(),}))
        navigate('/dashboard')
        MySwal.fire({
          title: 'Created!',
          text: 'Your book was successfully uploaded to the database',
          icon: 'success',
          confirmButtonText: 'Ok',
        }) 
    
        // limpiar campos
        e.target.reset();
  
      } catch (error) {
  
        console.log(error)
        MySwal.fire({
          title: 'Error!',
          text: 'Sorry... your book was not successfully uploaded to the database',
          icon: 'error',
          confirmButtonText: 'Ok',
        }) 
  
      }
    }

  };

  return (
    <section className="form">
      <div className="form__titulo">
        <p className="form__titulo-detalle">Please complete the form.</p>
      </div>

      <form className="form__container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input-section">
          <label>
            <h2 className="form__input-title">Title: </h2>
          </label>
          <input
            id="title"
            className="form__input"
            type="text"
            placeholder="Max 30 characters"
            autoComplete="off"
            defaultValue = {book.title}
            {...register("title", {
              required: {
                value: true,
                message: "The title input is required",
              },
              maxLength: {
                value: 30,
                message: "Must be less than 30 characters",
              },
            })}
          />
        </div>
        {errors.title && <span className="form__input-error">{errors.title.message}</span>}

        <div className="form__input-section">
          <label>
            <h2 className="form__input-gender">Image: </h2>
          </label>
          <input
            id="image"
            className="form__input"
            type="text"
            placeholder="Enter the image URL"
            autoComplete="off"
            defaultValue = {book.imageLink}
            {...register("image", {
              required: {
                value: true,
                message: "The image input is required",
              },
            })}
          />
        </div>
        {errors.image && <span className="form__input-error">{errors.image.message}</span>}

        <div className="form__input-section">
          <label>
            <h2 className="form__input-gender">Country: </h2>
          </label>
          <input
            id="country"
            className="form__input"
            type="text"
            placeholder="Max 20 letters"
            autoComplete="off"
            defaultValue = {book.country}
            {...register("country", {
              required: {
                value: true,
                message: "The country input is required",
              },
              maxLength: {
                value: 20,
                message: "Must be less than 20 letters",
              },
            })}
          />
        </div>
        {errors.country && <span className="form__input-error">{errors.country.message}</span>}

        <div className="form__input-section">
          <label>
            <h2 className="form__input-year">Year: </h2>
          </label>
          <input
            id="year"
            className="form__input"
            type="number"
            placeholder="Max 30 letters"
            autoComplete="off"
            defaultValue = {book.year}
            {...register("year", {
              required: {
                value: true,
                message: "The year input is required",
              },
            })}
          />
        </div>
        {errors.year && <span className="form__input-error">{errors.year.message}</span>}

        <div className="form__input-section">
          <label>
            <h2 className="form__input-author">Author: </h2>
          </label>
          <input
            id="author"
            className="form__input"
            type="text"
            placeholder="Max 30 letters"
            autoComplete="off"
            defaultValue = {book.author}
            {...register("author", {
              required: {
                value: true,
                message: "The author input is required",
              },
              maxLength: {
                value: 30,
                message: "Must be less than 30 letters",
              },
            })}
          />
        </div>
        {errors.author && <span className="form__input-error">{errors.author.message}</span>}

        <div className="form__textarea-section">
          <label>
            <h2 className="form__input-synopsis">Synopsis: </h2>
          </label>
          <textarea
            className="form__textarea"
            name="synopsis"
            id="synopsis"
            rows="5"
            placeholder="Please enter a short summary"
            defaultValue = {book.synopsis}
            {...register("synopsis", {
              required: "The synopsis input is required",
            })}
          />
        </div>
        {errors.synopsis && <p className="form__input-error">{errors.synopsis.message}</p>}

        <button className="form__btn" id="formBtn">
          Load up
        </button>
      </form>
    </section>
  );
};

export default CreateBook;
