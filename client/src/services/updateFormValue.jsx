export const changeProp = (prop, event,form, setForm) => {
    setForm({...form, [prop]: event.target.value});
}