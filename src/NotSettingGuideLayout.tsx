import React, {Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useState} from "react";
import styled from "styled-components";

export function NotSettingGuideLayout() {
    const [leftWidth, setLeftWidth] = useState(250);
    const [firstHeight, setFirstHeight] = useState(250)

    return (
        <ContentWrapper>
            <Left width={leftWidth}>
                <LeftResizeBar
                    leftWidth={leftWidth}
                    setLeftWidth={setLeftWidth}
                />
            </Left>
            <Right
                firstHeight={firstHeight}
                setRightFirstHeight={setFirstHeight}
            />
        </ContentWrapper>
    )
}

const MIN_LEFT_WIDTH = 150;
const MAX_LEFT_WIDTH = 400;

function LeftResizeBar(props: { leftWidth: number, setLeftWidth: Dispatch<SetStateAction<number>> }) {
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
                zIndex: 1,
                width: '2px',
                height: '100%',
                background: '#cbd5e0',
                cursor: 'col-resize',
                left: `${props.leftWidth}px`,
            }}
            onMouseDown={handleMouseDown}
        />
    )
}

function Left(props: PropsWithChildren<{ width: number }>) {

    return (
        <div
            style={{
                position: 'relative',
                width: `${props.width}px`,
                height: '100%',
                backgroundColor: 'greenyellow',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <span>映像</span>
            <span>width: {props.width}px</span>
            <span>height: 500px</span>
            {props.children}
        </div>
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
