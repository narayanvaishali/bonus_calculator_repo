import firebase from "firebase";

//database
const db = firebase.database();

export function getBranches(done) {
  const branchesRef = db.ref("branches");
  branchesRef.once("value", snapshot => {
    const branches = snapshot.val();

    //console.log(branches);
    
    const list = Object.keys(branches).map(key => {
      const { branchname, target } = branches[key];
      return {
        key,
        branchname,
        target
      };
    });
    done(list);
  });
}

export function getBranch(key, done) {
  const branchRef = db.ref(`branches/${key}`);
  branchRef.once("value", snapshot => {
    const branch = snapshot.val();
    done(branch);
  });
}

export function createBranch(branch, done) {
  const branchesRef = db.ref("branches");
  branchesRef
    .push(branch)
    .then(res => done(false, res))
    .catch(err => done(err, undefined));
}

export function updateBranch(id, branch, done) {
  const branchRef = db.ref(`branches/${id}`);
  branchRef
    .update(branch)
    .then(res => {
      console.log(res);
      done(false);
    })
    .catch(err => {
      done(err, undefined);
    });
}

export function deleteBranch(id, done) {
  const branchRef = db.ref(`branches/${id}`);
  branchRef
    .remove()
    .then(res => {
      console.log(res);
      done(false);
    })
    .catch(err => {
      done(err, undefined);
    });
}
