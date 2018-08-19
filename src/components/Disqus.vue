<template>
</template>

<script>
  // Get the remote Disqus script and insert it into the DOM,
  // but only if it not already loaded (as that will cause warnings)
  if (!window.DISQUS) {
    var d = document, s = d.createElement('script');
    s.src = 'https://basilvetas.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  } else {
    window.DISQUS.reset({
      reload: true
    });
  }

export default {
  name: 'Disqus'
}

</script>