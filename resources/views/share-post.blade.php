<head>
    <title>{{ $post->title }}</title>

    <meta property="og:type" content="article">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="{{ $post->title }}">
    <meta property="og:description" content="{{ $post->address }}">
    <meta property="og:image" content="{{ url('storage/'.$post->cover_image) }}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $post->title }}">
    <meta name="twitter:image" content="{{ url('storage/'.$post->cover_image) }}">
</head>

<body>
    <script>
        window.location.href = "/post/{{ $post->id }}";
    </script>
</body>