import React, {Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useState} from "react";
import styled from "styled-components";

export function SettingGuideLayout() {
    const [leftWidth, setLeftWidth] = useState(250);
    const [firstHeight, setFirstHeight] = useState(250)

    return (
        <ContentWrapper>
            <Left leftWidth={leftWidth} setLeftWidth={setLeftWidth}/>
            <Right
                firstHeight={firstHeight}
                setRightFirstHeight={setFirstHeight}
            />
        </ContentWrapper>
    );
}


function Left(props: { leftWidth: number, setLeftWidth: Dispatch<SetStateAction<number>> }) {
    const [firstHeight, setFirstHeight] = useState(250);
    return (
        <div style={{
            position: 'relative',
            width: `${props.leftWidth}px`,
            height: '100%',
        }}>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: `${firstHeight}px`,
                    backgroundColor: 'greenyellow',
                }}
            >
                <BothResizeBar
                    leftWidth={props.leftWidth}
                    setLeftWidth={props.setLeftWidth}
                    firstHeight={firstHeight}
                    setFirstHeight={setFirstHeight}
                />
            </div>
            <div
                style={{
                    width: '100%',
                    height: `calc(100% - ${firstHeight}px)`,
                    backgroundColor: 'darkcyan'
                }}
            />
        </div>
    )
}


const MIN_LEFT_WIDTH = 150;
const MAX_LEFT_WIDTH = 350;

const MIN_FIRST_HEIGHT = 150;
const MAX_FIRST_HEIGHT = 350;

function BothResizeBar(props: {
    leftWidth: number,
    setLeftWidth: Dispatch<SetStateAction<number>>,
    firstHeight: number,
    setFirstHeight: Dispatch<SetStateAction<number>>
}) {
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                if (e.movementX < 0 && props.leftWidth + e.movementX < MIN_LEFT_WIDTH) {
                    props.setLeftWidth(MIN_LEFT_WIDTH);
                    return;
                }
                if (e.movementX > 0 && props.leftWidth + e.movementX > MAX_LEFT_WIDTH) {
                    props.setLeftWidth(MAX_LEFT_WIDTH);
                    return;
                }
                if (e.movementY < 0 && props.firstHeight + e.movementY < MIN_FIRST_HEIGHT) {
                    props.setFirstHeight(MIN_FIRST_HEIGHT);
                    return;
                }
                if (e.movementY > 0 && props.firstHeight + e.movementY > MAX_FIRST_HEIGHT) {
                    props.setFirstHeight(MAX_FIRST_HEIGHT);
                    return;
                }
                props.setFirstHeight(props.firstHeight + e.movementY);
                props.setLeftWidth(props.leftWidth + e.movementX);
            }
        },
        [isDragging, props]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div
            style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                backgroundColor: 'red',
                cursor: 'nwse-resize',
                bottom: 0,
                right: 0,
            }}
            onMouseDown={handleMouseDown}
        />
    )

}

function Right(
    props: PropsWithChildren<{
        firstHeight: number,
        setRightFirstHeight: Dispatch<SetStateAction<number>>
    }>
) {
    return (
        <div
            style={{
                flex: 1,
                height: '100%',
            }}>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: `${props.firstHeight}px`,
                    backgroundColor: 'beige'
                }}
            >
                <RightVerticalResizeBar
                    rightFirstHeight={props.firstHeight}
                    setRightFirstHeight={props.setRightFirstHeight}
                />
            </div>
            <div style={{
                width: '100%',
                height: `calc(100% - ${props.firstHeight}px)`,
                backgroundColor: 'orange'
            }}/>
        </div>
    )
}


const MIN_RIGHT_FIRST_HEIGHT = 150;
const MAX_RIGHT_FIRST_HEIGHT = 400;

function RightVerticalResizeBar(props: {
    rightFirstHeight: number,
    setRightFirstHeight: Dispatch<SetStateAction<number>>
}) {
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                if (e.movementY < 0 && props.rightFirstHeight + e.movementY < MIN_RIGHT_FIRST_HEIGHT) {
                    props.setRightFirstHeight(MIN_RIGHT_FIRST_HEIGHT);
                    return;
                }
                if (e.movementY > 0 && props.rightFirstHeight + e.movementY > MAX_RIGHT_FIRST_HEIGHT) {
                    props.setRightFirstHeight(MAX_RIGHT_FIRST_HEIGHT);
                    return;
                }
                props.setRightFirstHeight(props.rightFirstHeight + e.movementY);
            }
        },
        [isDragging, props]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div
            style={{
                position: 'absolute',
                bottom: 0,
                height: '2px',
                width: '100%',
                background: '#cbd5e0',
                cursor: 'ns-resize',
            }}
            onMouseDown={handleMouseDown}
        />
    )
}

const ContentWrapper = styled.div`
    display: flex;
    width: 500px;
    height: 500px;
`