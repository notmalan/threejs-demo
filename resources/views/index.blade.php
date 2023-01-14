<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/sass/app.scss')
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
</head>

<body class="">
    <div class="flex flex-col gap-y-[10px] py-[10px] px-[10px]">
        <!-- Example A -->
        <div>
            <p>Example A</p>
            <span data-scene="cube" class="w-[400px] lg:w-[600px] h-[200px] lg:h-[300px]"></span>
        </div>

        <div>
            <p>Example B</p>
            <span data-scene="diamond" class="w-[400px] lg:w-[600px] h-[200px] lg:h-[300px]"></span>
        </div>

        <div>
            <p>Example C</p>
            <span data-scene="three-diamonds" class="w-[400px] lg:w-[600px] h-[200px] lg:h-[300px]"></span>
        </div>
    </div>
</body>

</html>
