function Course(tittle,teacher,level,isActive,views,updateveiws){
    this.tittle=tittle;
    this.teacher=teacher;
    this.level=level;
    this.isActive=isActive;
    this.views=views;
    this.updateveiws=function () {
        return ++this.views;
    }
}
var Course1=new Course("python","ali alizadeh",4,true,0);
var Course2=new Course("C++","mehrdad rezaei",3,true,150);
var Course3=new Course("java script","ali miri",6,true,135);
console.log(Course1);
console.log(Course2);
console.log(Course3);
console.log(Course1);