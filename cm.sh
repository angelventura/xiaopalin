#!/bin/bash
#
# Version 1.0
#
# Same as: SCRIPT_PATH="$PWD/$(dirname "$0")"
# $./servers/cm.sh
#  ./servers
#  /Users/mendogomeza/projects/spoonapps/jenkins/data/./servers
SCRIPT_PATH="$(dirname "$0")";


echo Version 1, path: $SCRIPT_PATH;


TRUE=0
FALSE=1

function step(){
	local text="$1";

    echo "";
    echo " - $text";    
}

function start(){
	local msg="$1";

	echo ;
	echo ;
	echo + $msg ...;
#	echo ;
}


function end(){
	local msg="$1";

#	echo ;
	echo + $msg OK.;
	echo ;
	echo ;
}


function test(){
	local value="$1";
	local message="$2";

	if [ "$value" != "$TRUE" ] ; then
		end "EXIT, Error: $message code:[$value]";
		
		exit  $FALSE;
	fi
}

function clean(){
    MSG="Cleaning $SCRIPT_PATH";
    start "$MSG";

	find "$SCRIPT_PATH" -name \*~ -print -type f -exec rm {} \; ; 
	find "$SCRIPT_PATH" -name \*~ -print -type f -exec rm {} \; ; 
	find "$SCRIPT_PATH" -name .DS_Store -print -type f -exec rm {} \; ; 
	find "$SCRIPT_PATH" -name \#\*\# -print -type f -exec rm {} \; ;
	find "$SCRIPT_PATH" -name .#\* -print -exec rm {} \; ;

  
    end "$MSG";
}


function gitCommit(){
    local msg="$1";

	pushd "$SCRIPT_PATH";
	test "$?" "pushd "$repo"";
	

    step "Commiting into remote:"
    git remote show origin;
    test "$?" "git remote show origin";


    MSG="Commiting: $msg"
    start "$MSG";
    
    git pull;
    test "$?" "git pull";
    
    git add --all;
    test "$?" "git add --all";

    if [ "$msg" == "" ] ; then
        # git commit -m "";
        git commit -a --allow-empty -m "" --allow-empty-message;
        test "$?" "git commit";
    else
        git commit -m "$msg";
        test "$?" "git commit";
    fi
        
    git push origin master;
    test "$?" "git push origin master";

    end "$MSG";

	popd;
	test "$?" "popd";

}

clean;

gitCommit "$*";
