#Project Flow

##Create Issue


##Prepare Branch

- On Master and all clean

BCNM33961883A:brooklyn i312480$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean

- Update Master
BCNM33961883A:brooklyn i312480$ git pull
Enter passphrase for key '/Users/i312480/.ssh/gallo': 
Already up-to-date.

- Create Local Branch
BCNM33961883A:brooklyn i312480$ git branch <dev-spider>
BCNM33961883A:brooklyn i312480$ git branch 
  dev-spider
* master

- Create Remote Branch
BCNM33961883A:brooklyn i312480$ git push -u origin dev-spider
Enter passphrase for key '/Users/i312480/.ssh/gallo': 
Total 0 (delta 0), reused 0 (delta 0)
To git@gallo.github.com:ingaudio/brooklyn.git
 * [new branch]      dev-spider -> dev-spider
Branch dev-spider set up to track remote branch dev-spider from origin.

##WORKING

BCNM33961883A:brooklyn i312480$ git branch 
  dev-spider
* master
BCNM33961883A:brooklyn i312480$ git checkout <dev-spider>
Switched to branch 'dev-spider'
BCNM33961883A:brooklyn i312480$ git status
On branch dev-spider
Your branch is up-to-date with 'origin/dev-spider'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")

BCNM33961883A:brooklyn i312480$  git add *
BCNM33961883A:brooklyn i312480$ git commit -m "readme update"
[dev-spider 574410f] readme update
 1 file changed, 2 insertions(+), 1 deletion(-)
 BCNM33961883A:brooklyn i312480$ git push
Enter passphrase for key '/Users/i312480/.ssh/gallo': 
Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 275 bytes | 0 bytes/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To git@gallo.github.com:ingaudio/brooklyn.git
   060efb2..574410f  dev-spider -> dev-spider


##UPDATE of your branch

- Update Master
BCNM33961883A:brooklyn i312480$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
BCNM33961883A:brooklyn i312480$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
BCNM33961883A:brooklyn i312480$ git pull
Enter passphrase for key '/Users/i312480/.ssh/gallo': 
Already up-to-date.

- Update Branch
BCNM33961883A:brooklyn i312480$ git checkout dev-spider
Switched to branch 'dev-spider'
Your branch is up-to-date with 'origin/dev-spider'.
BCNM33961883A:brooklyn i312480$ git status
On branch dev-spider
Your branch is up-to-date with 'origin/dev-spider'.
nothing to commit, working directory clean
BCNM33961883A:brooklyn i312480$ git pull
Enter passphrase for key '/Users/i312480/.ssh/gallo': 
Enter passphrase for key '/Users/i312480/.ssh/gallo': 
Already up-to-date.

- Rebase
BCNM33961883A:brooklyn i312480$ git status
On branch dev-spider
Your branch is up-to-date with 'origin/dev-spider'.
nothing to commit, working directory clean
BCNM33961883A:brooklyn i312480$ git rebase master
Current branch dev-spider is up to date.
BCNM33961883A:brooklyn i312480$ git status
On branch dev-spider
Your branch is up-to-date with 'origin/dev-spider'.
nothing to commit, working directory clean

- Conflict
BCNM33961883A:brooklyn i312480$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: readme update
Using index info to reconstruct a base tree...
M	README.md
Falling back to patching base and 3-way merge...
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
error: Failed to merge in the changes.
Patch failed at 0001 readme update
The copy of the patch that failed is found in: .git/rebase-apply/patch

When you have resolved this problem, run "git rebase --continue".
If you prefer to skip this patch, run "git rebase --skip" instead.
To check out the original branch and stop rebasing, run "git rebase --abort".

BCNM33961883A:brooklyn i312480$ git mergetool

##PUSH REQUEST

- Full Update of Master / Feature Branch
BCNM33961883A:brooklyn i312480$ git pull
Enter passphrase for key '/Users/i312480/.ssh/gallo': 
Already up-to-date.
BCNM33961883A:brooklyn i312480$ git push
Enter passphrase for key '/Users/i312480/.ssh/gallo': 
Counting objects: 6, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 702 bytes | 0 bytes/s, done.
Total 6 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), done.
To git@gallo.github.com:ingaudio/brooklyn.git
   574410f..0d564f3  dev-spider -> dev-spider

- on REMOTE (github) MUST BE the final version of the feature branch
git pull
git push


-create a pull-request on GITHUB




