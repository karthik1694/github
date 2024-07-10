import toast from "react-hot-toast";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import { useEffect,useState,useCallback } from "react";
const HomePage = () => {
    const [userProfile, setUserProfile] = useState(null);
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [sortType, setSortType] = useState("recent");

    const getUserProfileAndRepos = useCallback(async (username = "burakorkmez") =>{
        setLoading(true);
        console.log("dfaskhdga")
        try{
            console.log("askdjfaksbd")
            const res = await fetch(`https://api.github.com/users/${username}`,{
                headers:{
                authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`
                }
            });
            
            const userProfile = await res.json();
            setUserProfile(userProfile);
            
            const repoRes = await fetch(userProfile.repos_url);
            const repos = await repoRes.json();
            repos.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));//recent first
            setRepos(repos);
            console.log("user profile", userProfile);
            console.log("repos", repos);
            return {userProfile, repos};
        }
        catch(err){
            console.log(err);
            toast.error(`Failed to fetch user data: ${err.message}`);
        }
        finally{
            setLoading(false);
        }
    },[]);

    useEffect(()=>{
        getUserProfileAndRepos();
    },[getUserProfileAndRepos]);

    const onSearch = async (e,username)=>{
        e.preventDefault();
        setLoading(true);
        setRepos([]);
        setUserProfile(null);

        const data = await getUserProfileAndRepos(username);
        if (data) {
            const { userProfile, repos } = data;
            setUserProfile(userProfile);
            setRepos(repos);
          }
        setLoading(false);
        setSortType('recent');

    }
    const onSort = (sortType)=>{
        if(sortType === 'recent'){
            repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));//recent first
        }
        else if(sortType === 'stars'){
            repos.sort((a,b) => b.stargazers_count - a.stargazers_count);//most stars first
        }
        else if(sortType === 'forks'){
            repos.sort((a,b) => b.forks_count - a.forks_count);//most forks first
        }

        setSortType(sortType);
        setRepos([...repos]);//update the state with sorted array to reflect the changes in UI

   }

	return (
		<div className='m-4'>
			<Search onSearch={onSearch} />
			{repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
                {userProfile && !loading && <ProfileInfo userProfile={userProfile}/>}
                {!loading && <Repos repos={repos}/>}
                {loading && <Spinner/>}
			</div>
		</div>
	);
};

export default HomePage;