import React, { useState } from 'react'
import './App.css'


type Field = {
  fieldId: string;
  type: string;
  label: string;
  children :[]
};
type Children = {
  fieldId: string;
  type: string;
  label: string;

};

const  sectionData:Field = {
  fieldId : 'section',
  type: "container",
  label :"Section",
  children : []

}


const  fieldData:Children = {
  fieldId : 'field',
  type: "item",
  label :"Children",
}
const  subSectionData:Field = {
  fieldId : 'sub-section',
  type: "item",
  label :"Sub Section",
  children : []

}
const sectionFields:any = {
  fieldData,
  subSectionData
}


const  Items = [
  {
    id : 'section',
    label : "section",

  },
  {
    id : 'sub-section',
    label : "Sub section",

  },
  {
    id: 'field',
    label: 'children'
  }
]

function App() {

const  [fields,setFields] =useState<Field[]>([])

const filedsCopy = ()=> JSON.parse(JSON.stringify(fields))

const handleAddSection = ()=>{
  setFields((prev) => [...prev, sectionData]);

}


const handleFields =(sectionIdx:number , type:string='fieldData')=>{
const copyFields = filedsCopy() 

const updatedFields = copyFields.map((field:any ,idx:number)=>{
if(idx == sectionIdx){
  return {
    ...field,
    children : [
      ...field.children ,sectionFields[type]
    ]
  }
}
return field
})
setFields(updatedFields)

}

const handleSubFields =(sectionIdx:number ,subSectionIdx:number)=>{
  const copyFields = filedsCopy() 
  const parentSection= copyFields[sectionIdx]

const updatedSubFields = parentSection.children?.map((item:any,idx:number)=>{
if(idx ==subSectionIdx){
  return {
    ...item,
    children : [
      ...item.children, fieldData
    ]

  }
}
return item
})

const updatedState =  copyFields?.map((field:any,idx:number)=> {
if(idx == sectionIdx){
  return  {
    ...field,
    children: updatedSubFields
  }
}
return field
})
setFields(updatedState)

}


const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 

  };


const handleFieldDrop = (e:React.DragEvent ,  currentIndex:number)=>{
      e.preventDefault()
  
      const dropId = e.dataTransfer.getData('id')
  if(dropId !== 'section'){
   const type= dropId == 'field' ? 'fieldData' : 'subSectionData'
    handleFields(currentIndex,type)
  }
  
}

const handleSubFieldDrop = (e:React.DragEvent, mainIndex:number,currentIndex:number)=>{
  e.preventDefault()
  e.stopPropagation(); 

  const dropId = e.dataTransfer.getData('id')
  if(dropId == 'field'){
handleSubFields(mainIndex,currentIndex)
  }
}

  const handleSectionDrop =(e:React.DragEvent)=>{
    e.preventDefault();
    const dropId = e.dataTransfer.getData('id')
    if(dropId == 'section'){
      const copyFields = filedsCopy() 
      copyFields.push(sectionData)
      setFields(copyFields)
    }

  }
  const handleRemoveSection = (idx:number)=>{
    const copyFields = filedsCopy() 
    copyFields.splice(idx,1)
    setFields(copyFields)
  }

  const FieldWraper = ({idx,fields}:any)=>{
    if (!Array.isArray(fields)) {
      return null; 
    }
    
    return fields?.map((field:any,fieldIdx:any)=>  
      
  field?.fieldId =='field'  ?  
  <div
  
   className="bg-black rounded-sm p-4 text-gray-400 ">{field.label}</div>
  : 
  <div className="flex flex-col bg-black rounded-lg p-4 col-span-2 border gap-4"
  draggable 
  onDrop={(e)=>handleSubFieldDrop(e,idx,fieldIdx)}
  onDragOver={handleDragOver}
  onDragEnter={()=>console.log('drop')}>
  {field.label}
  <div className="bg-gray-700 rounded-sm p-4 grid grid-cols-2 gap-3  text-gray-400"

  >

  {!!field.children?.length ? <FieldWraper fields={field.children} /> : 'Drop here'}
  </div>
  <button className=' self-end w-40'  onClick={()=> handleSubFields(idx,fieldIdx)} >Add Sub Field</button>
  
  </div>
  
      )
    }

  const SectionWrapper = ({fields}:any)=>{

    if (!Array.isArray(fields)) {
      return null; // or some fallback UI
    }

    const handleSectionDragging  =(e:React.DragEvent,idx:number)=>{

e.dataTransfer.setData('idx',idx.toString())
    }

    const handleSectionDropping = (e:React.DragEvent,idx:number)=>{
      e.preventDefault()
const dragIndex = Number(e.dataTransfer.getData('idx'))
if(dragIndex == idx) return

const updatedFields = [ ...fields]

const  draggedItem = updatedFields.splice(dragIndex,1)
updatedFields.splice(idx,0,...draggedItem)
setFields(updatedFields)
    }


    return fields?.map(({label,children}:any , idx:number)=> 
      <div
draggable 
onDragOver={handleDragOver}
onDragStart={(e)=>handleSectionDragging(e,idx)}
onDrop={(e)=>handleSectionDropping(e,idx)}
       className=' flex flex-col gap-4 p-4 bg-black text-white border rounded-sm '>
      <div className='flex justify-between items-center'
     > {label} <div className='cursor-pointer w-5 h-5 rounded-full text-white  hover:bg-white hover:text-black justify-center items-center flex' onClick={()=>handleRemoveSection(idx)}>X</div></div> 
      <div className="bg-gray-700 rounded-sm p-4 grid grid-cols-2 gap-3 "
       draggable
       onDragOver={handleDragOver}
       onDrop={(e) => handleFieldDrop(e,idx)}
       >
   {!!children?.length ? <FieldWraper idx={idx} fields={children}/> : <div className=' text-gray-400 '>Drop here</div>}
  </div>
   <div className='flex gap-2 justify-end'>
  <button  onClick={()=> handleFields(idx)} >Add Field</button>
  
        <button  onClick={()=> handleFields(idx ,'subSectionData')} >Add Sub Section</button>
  
        </div>
        </div>
      )
    }
 

  
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* App bar */}
      <div className="flex bg-black/50 w-full h-16 justify-between shadow-md shadow-gray-500/50 rounded-b-md
 items-center text-center p-2 ">
        <h2  className='text-gray-200'>Dynamic Form Builder</h2>
        <div className='w-12 h-12 rounded-full bg-gray-600 text-white font-bold flex items-center justify-center'>
          ABE
        </div>
      </div>
     
      {/* Container */}
      <div id='container' className='grid grid-cols-3 gap-2 p-4 font-bold'>
     
        <div
        onDragOver={handleDragOver}
            onDrop={(e) => handleSectionDrop(e)}
              id='left-section'   className='col-span-2 bg-gray-800 rounded-md shadow-lg p-4 flex flex-col gap-4  h-[90vh] overflow-auto'
>
        <SectionWrapper fields={fields} />
        </div>



        <div id='right-section' className='flex flex-col gap-2 bg-gray-800  col-span-1 h-[90vh] rounded-md text-center p-4'>
{
  Items?.map((item)=> 
  <div draggable onDragStart={(e)=>{e.dataTransfer.setData('id',item.id)}}  className='p-4 border w-full bg-white rounded capitalize cursor-grab hover:bg-black hover:text-white'>
    {item?.label}
    </div>
  )
}
<br/>       
    

 <button className='p-4 border w-full bg-black rounded capitalize ' onClick={handleAddSection}>Add Section</button>
        {/* <button className='p-4 border w-full bg-black rounded capitalize ' onClick={()=>alert(JSON.stringify(fields,null,2))}>Get Json</button> */}
<br/>
        <div id ='json-viewer' className='border rounded-lg h-screen p-4 bg-black text-white overflow-auto text-left gap-2 flex flex-col'>
<h2>JSON</h2>
<pre className="bg-black text-gray-300 p-4 rounded text-sm overflow-auto ">

{JSON.stringify(fields,null,4)}
</pre>
        </div>
        </div>
      </div>
    </div>
  )
}

export default App
