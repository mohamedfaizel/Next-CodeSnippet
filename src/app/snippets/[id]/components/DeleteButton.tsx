"use client"
import { deleteSnippet } from "@/app/actions";
import { startTransition } from "react";

type ButtonProps = React.ComponentProps<'button'> & {deleteId: number};

export default function DeleteButton(props:ButtonProps){
    const {deleteId, className, ...rest} = props;
    const deleteActionHandler = ()=>{startTransition(async()=>{await deleteSnippet( deleteId)})}
    const classes = 'p-2 border rounded  ' + className;

  return <button className={classes.trim()} {...rest} onClick={deleteActionHandler}/>;
}