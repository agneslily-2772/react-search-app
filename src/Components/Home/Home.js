import React,{useEffect,useState} from 'react';
import './styles.css';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [pg,setPg] = useState(0);

  const perPage = 4;
  const visited = pg * perPage;
  const display = data.slice(visited,(visited+perPage))
    .map((item)=>{
      return (
                  <div className='items' key={item.id}>
          <p>
            Name : {item.name}<br/>
            Country : {item.country}<br/>
            Authors : {item.authors.join(', ')}<br/>
            ISBN : {item.isbn}<br/>
            Pages : {item.numberOfPages}<br/>
            Released : {new Date(item.released).toDateString()}<br/>
            Publisher : {item.publisher}<br/>
            Media : {item.mediaType}
          </p>
        </div>
      )
  });

  const filterMedia = e => {
    const selectedResult = e.target.value;
    const selectedAns = search.filter(
      item => (`${item.mediaType}`.includes(selectedResult))
    );
    setData(selectedAns);
  }
  const filterReleased = e =>{
    const ans = e.target.value;

    console.log(ans)
}
  const filterData = e => {
    const value = e.target.value.toLowerCase();
    const filteredData = search.filter(
      item => (`${item.name}`.toLowerCase().includes(value))
    )
    setData(filteredData);
  }
  const filterPublisher = e => {
    const value = e.target.value;
    const filteredPublsiher = search.filter(
      item => (`${item.publisher}`.includes(value))
    )
    setData(filteredPublsiher);
  }
  useEffect(() => {
    setLoading(true);
    fetch('https://www.anapioficeandfire.com/api/books?pageSize=30')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setSearch(data);

      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  const pageCount = Math.ceil(data.length / perPage);
  const turnPage = ({selected})=>{
setPg(selected)
  }
  return (
    <>
    <input className='search' type='text' placeholder='Type any name...' onInput={filterData}/>
    <div className='filters'>
    <div className='filter'>
      <div className='options'>
        <p>Media Type</p>
        <input type="radio" name="naan" value="Hardcover" onInput={filterMedia}/><label>Hardcover</label><br/>
        <input type='radio' name="naan" value="Paperback" onInput={filterMedia}/><label>Paperback</label><br/>
        <input type='radio' name="naan" value="GraphicNovel" onInput={filterMedia}/><label>GraphicNovel</label><br/><br/>
        <p>Released in</p>
        <input type="checkbox" value={2000} name="first" onInput={filterReleased}/><label>1990 - 2000</label><br/>
        <input type="checkbox" value={2010} name="second" onInput={filterReleased}/><label>2000 - 2010</label><br/>
        <input type="checkbox" value={2020} name="third" onInput={filterReleased}/><label>2010 - 2015</label><br/><br/>

        <p>Publisher</p>
        <input type="radio" name="me" value="Bantam Books" onInput={filterPublisher}/><label>Bantam Books</label><br/>
        <input type='radio' name="me" value="Tor" onInput={filterPublisher}/><label>Tor Books</label><br/>
        <input type='radio' name="me" value="Dabel Brothers" onInput={filterPublisher}/><label>Dabel Brothers</label><br/>
        <input type='radio' name="me" value="Marvel" onInput={filterPublisher}/><label>Marvel</label><br/>
      </div>

    </div>
    <div className='card'>
      {display} <ReactPaginate previousLabel={"<"} nextLabel={">"} pageCount={pageCount} onPageChange={turnPage} containerClassName={"paginationBttns"} previousLinkClassName={'previousBttn'} nextLinkClassName={'nextBttn'} disabledClassName={'paginationDisabled'} activeClassName='a'/>
  </div>
  </div>
  </>
  );
}
export default Home;