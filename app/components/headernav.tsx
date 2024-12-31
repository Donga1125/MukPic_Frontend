
export default function HeaderNav() {
    return (
        //요소 구분하기 위해 일부러 테두리 넣어놓음 (border border-lime-400 border-2)
        //z-index 중간인 z-25
        
        <div className="sticky top-0 w-full z-25 border border-lime-400 border-2">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">MukPic</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
}