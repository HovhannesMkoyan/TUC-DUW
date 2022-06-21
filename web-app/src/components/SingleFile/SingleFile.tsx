import React from "react";
import { useQuery } from "react-query";
import { useParams  } from 'react-router-dom'

import { get, downloadFile } from "../../services/file.service";
import { fetchFileKey, downloadFileKey } from "../../utils/queryKeys";

export default function SingleFile(props: any) {
  let {uuid} = useParams();

  const {
    isLoading,
    isError,
    isSuccess,
    data: file,
  } = useQuery([fetchFileKey, uuid], () => get(uuid!), {
    staleTime: 1000 * 60 * 30,
  });
  
  return <div>SingleFile</div>;
}
