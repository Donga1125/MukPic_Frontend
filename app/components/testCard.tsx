export default async function TestCard(){
    const response = await fetch('http://localhost:3000/api/auth');
    const data = await response.json();
    console.log("data",data);

    return (
    <>
        <div className="card" style={{width:200, height:200, backgroundColor:'lightgray'}}> 
            <div>
                <h1>테스트 카드</h1>
            </div>
            <div>
                <h2>데이터 : {data.data}</h2>
            </div>
        </div>
    </>
    )
}
