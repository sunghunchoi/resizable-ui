import styled from 'styled-components';
import React, {useState} from "react";
import {NotSettingGuideLayout} from "./NotSettingGuideLayout";
import {SettingGuideLayout} from "./SettingGuideLayout";

function App() {
    const [showNotSettingGuide, setShowNotSettingGuide] = useState(true);

    return (
        <>
            <button onClick={() => setShowNotSettingGuide(!showNotSettingGuide)}>
                {showNotSettingGuide ? 'ShowIncludeGuideLayout' : 'ShowNotIncludeGuideLayout'}
            </button>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50px',
            }}>
                {showNotSettingGuide ? 'ガイドが設定されてない場合のレイアウト' : 'ガイドが設定されてる場合のレイアウト'}
            </div>
            <MainWrapper>
                {showNotSettingGuide ?
                    <NotSettingGuideLayout/> :
                    <SettingGuideLayout/>
                }
            </MainWrapper>
        </>
    )
}

const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100%;
`;
export default App;
