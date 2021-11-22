import tokenService from './tokenService';

const BASE_URL = '/api/posts/';

export function create(post) {
    return fetch(BASE_URL, {
        method: 'POST',
        body: post, 
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad Credentials');
  });
}

export function getAll() {
	return fetch(BASE_URL, {
	  method: 'GET',
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => {
		// Valid login if we have a status of 2xx (res.ok)
		if (res.ok) return res.json();
		throw new Error('bad Credentials');
	});
  }

  export function removePost(id) {
    return fetch(`${BASE_URL}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json({message: "successfully deleted"});
      throw new Error("Login to remove a post");
    });
  }