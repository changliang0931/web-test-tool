import React from "react";

export function Mytextarea(props: any, onlyNmber: boolean | null | undefined) {
    
  if (onlyNmber) {
    return (
      <textarea
        cols={128}
        onKeyUp={(e:any)=>{
            e.target.value = e.target.value.repalce(/[^\r\n0-9]/g,'');
        }}
        {...props}
      />
    );
  } else return <textarea cols={128} {...props} />;
}
