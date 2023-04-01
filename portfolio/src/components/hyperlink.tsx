import React from 'react';

type props = {
  url: string;
  text: string;
};
export function Hyperlink({...props}: props){
  return <a href={props.url} style={{
      textDecoration: "none",
      color: "rgb(97,175,239)",
      cursor: "pointer",
    }}>
        {" " + props.text}
    </a>

}

export function Email(props: { children: string }){
  return <Hyperlink text={props.children} url={`mailto:${props.children}`}/>
}