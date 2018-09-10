import React from "react";
import { Route, Switch } from "react-router-dom";

//Components
import StaffList from "./staff-list";
import AddStaff from "./add-staff";
import EditStaff from "./edit-staff";
import DeleteStaff from "./delete-staff";

const StaffIndex = () => {
  return (
    <div>
      <Switch>
        <Route path="/staffs" component={StaffList} />
      </Switch>

      <Switch>
        <Route exact path="/staffs/add" component={AddStaff} />
        <Route exact path="/staffs/:id" component={EditStaff} />
        <Route exact path="/staffs/:id/delete" component={DeleteStaff} />
      </Switch>
    </div>
  );
};

export default StaffIndex;
