import { useState } from "react";
import './comp-css/Tabs-style.css'


const MainComp = () => {

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div>
            <div className="bloc-tabs">
                <button className={toggleState === 1 ? "tabs active-tabs tab-clicker" : "tabs  tab-clicker"} onClick={() => toggleTab(1)}>
                    Tab 1
                </button>
                <button className={toggleState === 2 ? "tabs active-tabs tab-clicker" : "tabs  tab-clicker"} onClick={() => toggleTab(2)}>
                    Tab 2
                </button>
            </div>

            <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <h2>Content 1</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
                        praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
                        vel voluptatum?
                    </p>
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <h2>Content 2</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
                        voluptatum qui adipisci.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MainComp
