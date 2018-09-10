import React from "react";
import { Route, Switch } from "react-router-dom";

//Components
import BranchList from "./branch-list";
import AddBranch from "./add-branch";
import EditBranch from "./edit-branch";
import DeleteBranch from "./delete-branch";

const BranchIndex = () => {
  return (
    <div>
      <Switch>
        <Route path="/branches" component={BranchList} />
      </Switch>

      <Switch>
        <Route exact path="/branches/add" component={AddBranch} />
        <Route exact path="/branches/:id" component={EditBranch} />
        <Route exact path="/branches/:id/delete" component={DeleteBranch} />
      </Switch>
    </div>
  );
};

export default BranchIndex;
