describe('Reductio sortBy', function () {
    var group, reducer;

    beforeEach(function () {
        var data = crossfilter([
            {foo: 1, bar: 6},
            {foo: 2, bar: 5},
            {foo: 3, bar: 4},
            {foo: 4, bar: 3},
            {foo: 5, bar: 2},
            {foo: 6, bar: 1}
        ]);

        var dim = data.dimension(function(d) { return d.foo; });
        group = dim.group();
        groupString = dim.group();

        reducer = reductio()
                .sum('bar')
                .count(true)
                .avg(true);

        reducer(group);
    });

    it('has six groups', function () {
        expect(group.post().sortBy('value.sum')().length).toEqual(6);
    });

    it('orders correctly', function () {
        var all = group.post().sortBy('-value.sum')();
        for(var i = 0; i < all.length; ++i){
            expect(all[i].value.sum).toBe(6-i);
        }
        all = group.post().sortBy('value.sum')();
        for(i = 0; i < all.length; ++i){
            expect(all[i].value.sum).toBe(i+1);
        }
    });

    it('works with functions', function(){
        var all = group.post().sortBy(function(d){
            return -d.value.sum;
        })();
        for(var i = 0; i < all.length; ++i){
            expect(all[i].value.sum).toBe(6-i);
        }
        all = group.post().sortBy(function(d){
            return d.value.sum;
        })();
        for(i = 0; i < all.length; ++i){
            expect(all[i].value.sum).toBe(i+1);
        }
    });

});
