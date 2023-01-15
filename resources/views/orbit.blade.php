<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/sass/app.scss')
    @vite('resources/css/app.css')
    {{-- @vite('resources/js/app.js') --}}
    @vite('resources/js/orbit.js')
</head>

<body class="">
    <div class="flex flex-col gap-y-[10px] py-[10px] ">
        <!-- Example A -->
        <div>
            <p>Example A</p>
            <span data-scene="orbit-a" class="w-[100vw] h-[50vw]"></span>
        </div>
        <div class="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quis minima, necessitatibus repellat tenetur maxime ex voluptate ut rerum autem minus! Voluptatum nemo tempora asperiores blanditiis nostrum neque inventore praesentium facere. Error laudantium quae blanditiis obcaecati sed, molestias illum incidunt similique quas aliquam cupiditate officiis, quia repudiandae provident fugit. Molestias.
        </div>

    </div>
</body>

</html>
