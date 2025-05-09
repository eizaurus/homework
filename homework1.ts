function getAnyArray(param:unknown[]){}
getAnyArray([1,'s',{sdad:'sdasd'}])

function getNotEmptyArray(param:[...unknown[],unknown]){}
//@ts-expect-error
getNotEmptyArray([])
getNotEmptyArray([1])

type arrT = {arr: [number,{obj:{name: string,value: string}},{hello: number}],value: number
}
function structureType(value: arrT): string {
    return value.arr[1].obj.name;
}
const structureType1: arrT = {arr: [1,{obj: {name: 'sdf',value: ''}},{hello: 1}],value: 1} as const;
structureType(structureType1);

type arrT2 = {arr: [number,{obj:{name: string,value: string,[key: string]: unknown}},{hello: number,[key: string]: unknown;}],value: number,[key: string]: unknown;
}
function structureType2(value: arrT2): string {
    return value.arr[1].obj.name;
}
const structureType21: arrT2 = {
    arr: [
        1,
        {
            obj: {
                name: 'sdf',
                value: '',
                test:'1'
            }
        },
        {
            hello: 1
        }
    ],
    value: 1
} as const;
structureType2(structureType21);


type TestIntersection<T> = T & unknown;
type ResTestIntersection = TestIntersection<string>

type TestIntersection2<T> = T & never;
type ResTestIntersection2 = TestIntersection2<string>

type TestUnion<T> = T | never;
type ResTestUnion = TestUnion<number>

type TestUnion2<T> = T | unknown;
type ResTestUnion2 = TestUnion2<string>

type FilterIntersection<T> = T & string;
type ResFilterIntersection = FilterIntersection<1|2|'value'|'b'>

type FindEventByIntersection<T,K>=T&{type:'user-deleted',data:object}
type Event1={type:'user-created';data:{name:string}}
type Event2={type:'user-deleted';data:{id:number}}
type ResFindEventByIntersection=FindEventByIntersection<Event1|Event2,'user-deleted'>

type structureUnionT=[{isOne:true},number]|[{isTwo:true},number,number]|[{isThree:true},number,number,number]
function structureUnion(...params:structureUnionT){}
structureUnion({isOne:true},1)
//@ts-expect-error
structureUnion({isOne:true},1,2)
structureUnion({isTwo:true},1,2)
structureUnion({isThree:true},1,2,3)

type cbF= (...param:any[])=>number|string
function anyCallback(cb: cbF){}
anyCallback((a:number)=>1)
anyCallback((a:number,b:number)=>"str")


type Ref<T>={current:T}|((value:T)=>void)
type SuperRef=Ref<any>
function storeRef(anyRef:SuperRef){}
const numberRef={} as Ref<number>
const stringRef={} as Ref<string>
storeRef(numberRef)
storeRef(stringRef)