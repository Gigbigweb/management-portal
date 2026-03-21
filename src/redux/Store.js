import {configureStore} from '@reduxjs/toolkit' 
import ClientSlice from './slice/client'  
import PackageSlice from './slice/package'  
import StaffSlice from './slice/staff'  
import CategorySlice from './slice/category'  
import RoleSlice from './slice/role'  
import ServiceSlice from './slice/service'  
import ProjectSlice from './slice/project'  
import TeamSlice from './slice/team'  
import RatingSlice from './slice/rating'  
import blogSlice from './slice/blog'  

export  const store = configureStore({
    reducer : { 
        "client" : ClientSlice, 
        "package" : PackageSlice, 
        "staff" : StaffSlice, 
        "category" : CategorySlice, 
        "role" : RoleSlice, 
        "service" : ServiceSlice, 
        "project" : ProjectSlice, 
        "team" : TeamSlice, 
        "rating" : RatingSlice, 
        "blog" : blogSlice, 
    }
})
